import HomeContact from './_components/contact';
import HomeIntro from './_components/intro';
import HomeProduct from './_components/product';

export const revalidate = 60;

export default function Home() {
  return (
    <div>
      <HomeIntro />
      {/* <HomeProduct /> */}
      <HomeContact />
    </div>
  );
}
