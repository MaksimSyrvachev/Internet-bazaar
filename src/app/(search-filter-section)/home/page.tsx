import React, { Suspense } from 'react';

import { LeftFilter } from '@/components/LeftFilter';
import { Ads } from '@/components/Ads';
import { LeftFilterProvider } from '@/components/LeftFilterProvider';
import { CategoriesFetch } from '@/components/CategoriesFetch';

const Home = () => <Ads />;

export default Home;
