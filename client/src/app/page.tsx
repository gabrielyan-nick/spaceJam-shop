import { NextPage } from 'next';

const HomePage: NextPage = () => {
  return (
    <figure className="rounded-xl p-8 ">
      <div className="pt-6 space-y-4">
        <blockquote>
          <p className="text-lg">
            “Tailwind CSS is the only framework that I've seen scale on large
            teams. It’s easy to customize, adapts to any design, and the build
            size is tiny.”
          </p>
        </blockquote>
        <figcaption>
          <div className="">Sarah Dayan</div>
          <div>Staff Engineer, Algolia</div>
        </figcaption>
      </div>
    </figure>
  );
};

export default HomePage;
