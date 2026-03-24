(function () {
  "use strict";

  const DEFAULT_DRACO_DECODER_PATH =
    "https://www.gstatic.com/draco/versioned/decoders/1.5.7/";

  const DEP_URLS = {
    THREE: "https://esm.sh/three@0.160.0",
    ORBIT: "https://esm.sh/three@0.160.0/examples/jsm/controls/OrbitControls",
    GLTF: "https://esm.sh/three@0.160.0/examples/jsm/loaders/GLTFLoader",
    DRACO: "https://esm.sh/three@0.160.0/examples/jsm/loaders/DRACOLoader",
    ROOM: "https://esm.sh/three@0.160.0/examples/jsm/environments/RoomEnvironment",
  };

  let depsPromise = null;
  let cachedDeps = null;

  function ensureDeps() {
    if (cachedDeps) return Promise.resolve(cachedDeps);
    if (depsPromise) return depsPromise;

    depsPromise = Promise.all([
      import(DEP_URLS.THREE),
      import(DEP_URLS.ORBIT),
      import(DEP_URLS.GLTF),
      import(DEP_URLS.DRACO),
      import(DEP_URLS.ROOM),
    ]).then(([threeMod, orbitMod, gltfMod, dracoMod, roomMod]) => {
      cachedDeps = {
        THREE: threeMod,
        OrbitControls: orbitMod.OrbitControls,
        GLTFLoader: gltfMod.GLTFLoader,
        DRACOLoader: dracoMod.DRACOLoader,
        RoomEnvironment: roomMod.RoomEnvironment,
      };
      window.Product3DEmbedViewer = Product3DEmbedViewer;
      return cachedDeps;
    });

    return depsPromise;
  }

  function toBool(value, fallback) {
    if (value === undefined || value === null || value === "") return fallback;
    const text = String(value).trim().toLowerCase();
    if (["1", "true", "yes", "on"].includes(text)) return true;
    if (["0", "false", "", "off"].includes(text)) return false;
    return fallback;
  }

  function toNumber(value, fallback) {
    const num = Number(value);
    return Number.isFinite(num) ? num : fallback;
  }

  function parseOptionsFromElement(container) {
    const ds = container.dataset || {};
    return {
      container,
      modelUrl: ds.modelUrl || "",
      modelCrossOrigin: ds.modelCrossOrigin || "anonymous",
      background: ds.bg || "transparent",
      autoRotate: toBool(ds.autoRotate, true),
      autoRotateSpeed: toNumber(ds.autoRotateSpeed, 0.8),
      exposure: toNumber(ds.exposure, 1),
      ambientIntensity: toNumber(ds.ambient, 1.25),
      directionalIntensity: toNumber(ds.dir, 1.6),
      directionalColor: ds.dirColor || "#ffffff",
      azimuth: toNumber(ds.azimuth, 35),
      elevation: toNumber(ds.elevation, 35),
      enableZoom: toBool(ds.zoom, true),
      enablePan: toBool(ds.pan, false),
      enableRotate: toBool(ds.rotate, true),
      cameraFov: toNumber(ds.fov, 45),
      targetMaxDim: toNumber(ds.targetMaxDim, 1.2),
      dracoDecoderPath: ds.dracoPath || DEFAULT_DRACO_DECODER_PATH,
      pixelRatioMax: toNumber(ds.pixelRatioMax, 2),
      status: toBool(ds.status, false),
    };
  }

  function sphericalToCartesian(THREE, azRad, elRad, radius) {
    return new THREE.Vector3(
      radius * Math.cos(elRad) * Math.cos(azRad),
      radius * Math.sin(elRad),
      radius * Math.cos(elRad) * Math.sin(azRad),
    );
  }

  function normalizeModelScale(THREE, obj, targetMaxDim) {
    const box = new THREE.Box3().setFromObject(obj);
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    if (!Number.isFinite(maxDim) || maxDim <= 0) return;
    obj.scale.multiplyScalar(targetMaxDim / maxDim);
  }

  function fitCameraToObject(THREE, camera, controls, obj, offset) {
    const box = new THREE.Box3().setFromObject(obj);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());

    obj.position.sub(center);

    const maxDim = Math.max(size.x, size.y, size.z);
    const fov = THREE.MathUtils.degToRad(camera.fov);
    const cameraZ = Math.max(
      Math.abs((maxDim * offset) / Math.tan(fov / 2)),
      0.5,
    );

    camera.position.set(0, maxDim * 0.25, cameraZ);
    camera.near = Math.max(0.01, cameraZ / 100);
    camera.far = Math.max(100, cameraZ * 200);
    camera.updateProjectionMatrix();

    controls.target.set(0, 0, 0);
    controls.update();
  }

  function disposeMaterial(material) {
    if (!material) return;

    for (const key of Object.keys(material)) {
      const value = material[key];
      if (value && value.isTexture) {
        value.dispose();
      }
    }

    if (typeof material.dispose === "function") {
      material.dispose();
    }
  }

  function disposeObject3D(object) {
    if (!object) return;

    object.traverse((child) => {
      if (!child.isMesh) return;

      if (child.geometry && typeof child.geometry.dispose === "function") {
        child.geometry.dispose();
      }

      if (Array.isArray(child.material)) {
        child.material.forEach(disposeMaterial);
      } else {
        disposeMaterial(child.material);
      }
    });
  }

  class Product3DEmbedViewer {
    constructor(options, deps) {
      if (!options.container) {
        throw new Error("Product3DEmbedViewer: container is required.");
      }

      this.deps = deps;
      this.container =
        typeof options.container === "string"
          ? document.querySelector(options.container)
          : options.container;

      if (!this.container) {
        throw new Error("Product3DEmbedViewer: container not found.");
      }

      this.options = {
        modelUrl: options.modelUrl || "",
        modelCrossOrigin: options.modelCrossOrigin || "anonymous",
        background: options.background ?? "transparent",
        autoRotate: options.autoRotate ?? true,
        autoRotateSpeed: options.autoRotateSpeed ?? 0.8,
        exposure: options.exposure ?? 1,
        ambientIntensity: options.ambientIntensity ?? 1.25,
        directionalIntensity: options.directionalIntensity ?? 1.6,
        directionalColor: options.directionalColor || "#ffffff",
        azimuth: options.azimuth ?? 35,
        elevation: options.elevation ?? 35,
        enableZoom: options.enableZoom ?? true,
        enablePan: options.enablePan ?? false,
        enableRotate: options.enableRotate ?? true,
        cameraFov: options.cameraFov ?? 45,
        targetMaxDim: options.targetMaxDim ?? 1.2,
        dracoDecoderPath:
          options.dracoDecoderPath || DEFAULT_DRACO_DECODER_PATH,
        pixelRatioMax: options.pixelRatioMax ?? 2,
        status: options.status ?? false,
        onLoad: typeof options.onLoad === "function" ? options.onLoad : null,
        onError: typeof options.onError === "function" ? options.onError : null,
      };

      this.currentModel = null;
      this.isDisposed = false;
      this.clock = new this.deps.THREE.Clock();

      this._buildDOM();
      this._buildThree();
      this._bindResize();
      this.resize();
      this._animate();

      if (this.options.modelUrl) {
        this.load(this.options.modelUrl).catch(() => {});
      } else {
        this._setStatus("No model URL");
      }
    }

    _buildDOM() {
      this.container.classList.add("product-3d-embed");

      if (!this.container.style.position) {
        this.container.style.position = "relative";
      }

      if (!this.container.style.overflow) {
        this.container.style.overflow = "hidden";
      }

      const computed = window.getComputedStyle(this.container);
      const hasExplicitHeight =
        parseFloat(computed.height) > 0 ||
        !!this.container.style.height ||
        !!this.container.style.minHeight ||
        !!this.container.style.aspectRatio;

      if (!hasExplicitHeight && this.container.clientHeight === 0) {
        this.container.style.minHeight = "320px";
      }

      this.canvas = document.createElement("canvas");
      this.canvas.style.display = "block";
      this.canvas.style.width = "100%";
      this.canvas.style.height = "100%";
      this.canvas.style.touchAction = "none";
      this.canvas.setAttribute("aria-label", "3D model viewer");
      this.container.appendChild(this.canvas);

      this.statusEl = document.createElement("div");
      Object.assign(this.statusEl.style, {
        position: "absolute",
        left: "12px",
        bottom: "12px",
        padding: "6px 10px",
        borderRadius: "999px",
        font: "12px/1.2 Arial, sans-serif",
        color: "#fff",
        background: "rgba(0,0,0,0.55)",
        pointerEvents: "none",
        opacity: this.options.status ? "1" : "0",
        transition: "opacity 0.2s ease",
      });
      this.statusEl.textContent = "Loading…";
      this.container.appendChild(this.statusEl);
    }

    _buildThree() {
      const THREE = this.deps.THREE;
      const OrbitControls = this.deps.OrbitControls;
      const RoomEnvironment = this.deps.RoomEnvironment;
      const DRACOLoader = this.deps.DRACOLoader;

      this.renderer = new THREE.WebGLRenderer({
        canvas: this.canvas,
        antialias: true,
        alpha: true,
        preserveDrawingBuffer: false,
      });

      this.renderer.setPixelRatio(
        Math.min(window.devicePixelRatio || 1, this.options.pixelRatioMax),
      );
      this.renderer.outputColorSpace = THREE.SRGBColorSpace;
      this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
      this.renderer.toneMappingExposure = this.options.exposure;

      this.scene = new THREE.Scene();

      const pmrem = new THREE.PMREMGenerator(this.renderer);
      this.environmentTexture = pmrem.fromScene(
        new RoomEnvironment(),
        0.04,
      ).texture;
      this.scene.environment = this.environmentTexture;
      pmrem.dispose();

      this.camera = new THREE.PerspectiveCamera(
        this.options.cameraFov,
        1,
        0.01,
        2000,
      );
      this.camera.position.set(0, 0.6, 2.2);

      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.controls.enableDamping = true;
      this.controls.dampingFactor = 0.08;
      this.controls.enablePan = !!this.options.enablePan;
      this.controls.enableZoom = !!this.options.enableZoom;
      this.controls.enableRotate = !!this.options.enableRotate;

      this.renderer.domElement.addEventListener("contextmenu", (event) => {
        event.preventDefault();
      });

      this.ambientLight = new THREE.AmbientLight(
        0xffffff,
        this.options.ambientIntensity,
      );
      this.scene.add(this.ambientLight);

      this.directionalLight = new THREE.DirectionalLight(
        this.options.directionalColor,
        this.options.directionalIntensity,
      );
      this.scene.add(this.directionalLight);
      this.scene.add(this.directionalLight.target);

      this.root = new THREE.Group();
      this.scene.add(this.root);

      this.dracoLoader = new DRACOLoader();
      this.dracoLoader.setDecoderPath(this.options.dracoDecoderPath);
      this.dracoLoader.setDecoderConfig({ type: "js" });

      this._applyBackground();
      this._applyLightDirection();
    }

    _createCrossOriginGltfLoader(modelUrl) {
      const THREE = this.deps.THREE;
      const GLTFLoader = this.deps.GLTFLoader;

      const manager = new THREE.LoadingManager();
      const modelBaseUrl = new URL("./", modelUrl).href;

      manager.setURLModifier((assetUrl) => {
        if (
          /^(https?:)?\/\//i.test(assetUrl) ||
          assetUrl.startsWith("blob:") ||
          assetUrl.startsWith("data:")
        ) {
          return assetUrl;
        }

        return new URL(assetUrl, modelBaseUrl).href;
      });

      const loader = new GLTFLoader(manager);
      loader.setCrossOrigin(this.options.modelCrossOrigin || "anonymous");
      loader.setDRACOLoader(this.dracoLoader);

      return loader;
    }

    _bindResize() {
      this._resizeHandler = () => this.resize();
      window.addEventListener("resize", this._resizeHandler);

      if (typeof ResizeObserver !== "undefined") {
        this.resizeObserver = new ResizeObserver(() => this.resize());
        this.resizeObserver.observe(this.container);
      }
    }

    _applyBackground() {
      const THREE = this.deps.THREE;

      if (
        this.options.background === "transparent" ||
        this.options.background == null ||
        this.options.background === ""
      ) {
        this.scene.background = null;
        this.renderer.setClearColor(0x000000, 0);
        return;
      }

      const color = new THREE.Color(this.options.background);
      this.scene.background = color;
      this.renderer.setClearColor(color, 1);
    }

    _applyLightDirection() {
      const THREE = this.deps.THREE;
      const az = THREE.MathUtils.degToRad(this.options.azimuth);
      const el = THREE.MathUtils.degToRad(this.options.elevation);

      this.directionalLight.position.copy(
        sphericalToCartesian(THREE, az, el, 5),
      );
      this.directionalLight.target.position.set(0, 0, 0);
      this.directionalLight.color = new THREE.Color(
        this.options.directionalColor,
      );
      this.directionalLight.intensity = this.options.directionalIntensity;
    }

    _setStatus(text) {
      if (!this.statusEl) return;
      this.statusEl.textContent = text || "";
      if (this.options.status) {
        this.statusEl.style.opacity = text ? "1" : "0";
      }
    }

    resize() {
      if (this.isDisposed) return;

      const width = Math.max(1, Math.floor(this.container.clientWidth || 1));
      const height = Math.max(1, Math.floor(this.container.clientHeight || 1));

      this.renderer.setSize(width, height, false);
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
    }

    async load(modelUrl) {
      if (!modelUrl) {
        throw new Error("Product3DEmbedViewer.load: modelUrl is required.");
      }

      this.options.modelUrl = modelUrl;
      this._setStatus("Loading model…");

      if (this.currentModel) {
        this.root.remove(this.currentModel);
        disposeObject3D(this.currentModel);
        this.currentModel = null;
      }

      this.root.rotation.set(0, 0, 0);

      return new Promise((resolve, reject) => {
        const THREE = this.deps.THREE;
        const modelAbsUrl = new URL(modelUrl, window.location.href).href;
        const gltfLoader = this._createCrossOriginGltfLoader(modelAbsUrl);

        gltfLoader.load(
          modelAbsUrl,
          (gltf) => {
            const model = gltf.scene || gltf.scenes?.[0];
            if (!model) {
              const err = new Error("GLTF loaded but scene is missing.");
              this._setStatus("Invalid model");
              reject(err);
              return;
            }

            model.traverse((child) => {
              if (!child.isMesh) return;

              child.castShadow = false;
              child.receiveShadow = false;

              if (!child.material) return;

              const materials = Array.isArray(child.material)
                ? child.material
                : [child.material];

              materials.forEach((material) => {
                material.transparent = material.transparent === true;
                material.depthWrite = true;
                if ("envMapIntensity" in material) {
                  material.envMapIntensity = 1.0;
                }
                if ("needsUpdate" in material) {
                  material.needsUpdate = true;
                }
              });
            });

            this.root.add(model);
            this.currentModel = model;

            normalizeModelScale(THREE, model, this.options.targetMaxDim);
            fitCameraToObject(THREE, this.camera, this.controls, model, 1.25);

            this._setStatus("Ready");
            if (this.options.onLoad) {
              this.options.onLoad(model, modelUrl, this);
            }
            resolve(model);
          },
          undefined,
          (error) => {
            console.error("Model load failed:", error);
            this._setStatus("Failed to load");
            if (this.options.onError) {
              this.options.onError(error, modelUrl, this);
            }
            reject(error);
          },
        );
      });
    }

    setModel(modelUrl) {
      return this.load(modelUrl);
    }

    setAutoRotate(enabled) {
      this.options.autoRotate = !!enabled;
    }

    setAutoRotateSpeed(speed) {
      this.options.autoRotateSpeed = toNumber(
        speed,
        this.options.autoRotateSpeed,
      );
    }

    setBackground(background) {
      this.options.background = background;
      this._applyBackground();
    }

    _animate = () => {
      if (this.isDisposed) return;

      const delta = this.clock.getDelta();
      this.controls.update();

      if (this.options.autoRotate && this.root) {
        this.root.rotation.y += delta * this.options.autoRotateSpeed;
      }

      this.renderer.render(this.scene, this.camera);
      this._raf = requestAnimationFrame(this._animate);
    };

    destroy() {
      if (this.isDisposed) return;

      this.isDisposed = true;
      cancelAnimationFrame(this._raf);
      window.removeEventListener("resize", this._resizeHandler);

      if (
        this.resizeObserver &&
        typeof this.resizeObserver.disconnect === "function"
      ) {
        this.resizeObserver.disconnect();
      }

      if (this.currentModel) {
        this.root.remove(this.currentModel);
        disposeObject3D(this.currentModel);
        this.currentModel = null;
      }

      if (this.controls && typeof this.controls.dispose === "function") {
        this.controls.dispose();
      }

      if (this.dracoLoader && typeof this.dracoLoader.dispose === "function") {
        this.dracoLoader.dispose();
      }

      if (
        this.environmentTexture &&
        typeof this.environmentTexture.dispose === "function"
      ) {
        this.environmentTexture.dispose();
      }

      if (this.renderer && typeof this.renderer.dispose === "function") {
        this.renderer.dispose();
      }

      if (this.canvas && typeof this.canvas.remove === "function") {
        this.canvas.remove();
      }

      if (this.statusEl && typeof this.statusEl.remove === "function") {
        this.statusEl.remove();
      }
    }
  }

  async function create3DModelEmbed(options) {
    const deps = await ensureDeps();
    return new Product3DEmbedViewer(options || {}, deps);
  }

  async function autoInitEmbeds() {
    const nodes = document.querySelectorAll("[data-embed-3d]");
    const viewers = [];

    for (const node of nodes) {
      if (node.__product3dViewer) {
        viewers.push(node.__product3dViewer);
        continue;
      }

      const viewer = await create3DModelEmbed(parseOptionsFromElement(node));
      node.__product3dViewer = viewer;
      viewers.push(viewer);
    }

    return viewers;
  }

  window.create3DModelEmbed = create3DModelEmbed;
  window.autoInit3DModelEmbeds = autoInitEmbeds;
  window.Product3DEmbedViewer = window.Product3DEmbedViewer || null;

  function bootAutoInit() {
    autoInitEmbeds().catch((error) => {
      console.error("Auto init 3D embeds failed:", error);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootAutoInit, { once: true });
  } else {
    bootAutoInit();
  }
})();
