'use client';

import { NextPage } from 'next';
import AuthService from 'services/auth/auth.service';
import CategoryService from 'services/category.service';
import ReviewService from 'services/review.service';
import StatisticsService from 'services/statistics.service';
import UserService from 'services/user.service';
import { EnumAuth } from 'store/user/user.interface';

const HomePage: NextPage = () => {
  // const response = async () => {
  //   const res = await StatisticsService.getMain();
  //   return res;
  // };

  // response().then(data => console.log(data));

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
