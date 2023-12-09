import { type Metadata } from 'next';
import React from 'react';

import { ProfilePage } from '@/components/ProfilePage';

export const metadata: Metadata = {
	title: 'My Profile'
};

const MyProfilePage = () => <ProfilePage />;

export default MyProfilePage;
