import React, {type ReactNode} from 'react';
import Footer from './footer/footer';
import {Outlet} from 'react-router-dom';
import HeaderDefault from './header/header-default';

type Props = {
	children?: ReactNode;
};

const DefaultLayout = ({children}: Props) => (
	<div className="grid min-h-screen w-full">
		<div className="flex flex-col sticky top-0">
			<HeaderDefault />
			<main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 overflow-auto">
				{children ?? <Outlet />}
			</main>
			<Footer />
		</div>
	</div>
);

export default DefaultLayout;
