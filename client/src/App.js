import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './component/PaymentForm';

// css files
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './component/UI/Layout.css';
import './component/UI/Layout.css';

// pages
import Register from './Pages/Register';
import LoginPage from './Pages/Login';
import HomePage from './Pages/HomePage';
import UsersPage from './component/AdminModule/AdminDashboard/UsersPages/Users';
import SellersPage from './component/AdminModule/AdminDashboard/UsersPages/Sellers';
import BuyersPage from './component/AdminModule/AdminDashboard/UsersPages/Buyers';
import AdminPage from './Pages/AdminDashboard';
import ProfilePage from './component/AdminModule/AdminDashboard/ProfilePage/profilePage';
import CurrentAuctionsPage from './component/AdminModule/AdminDashboard/AuctionsPages/currentAuctions';
import OngoingAuctionsPage from './component/AdminModule/AdminDashboard/AuctionsPages/ongoingAuctions';
import AboutUsPage from './Pages/AboutUsPage';
import ContactUsPage from './Pages/ContactUsPage';
import HowBidPage from './Pages/HowBidPage';
import PageNotFound from './Pages/PageNotFound';
import ViewCategoryAuctions from './component/Auctions/ViewCategoryAuctions/ViewCategoryAuctions';
import ViewAuctions from './Pages/ViewAuctions';
// css files
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './component/UI/Layout.css';
// css files
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './component/UI/Layout.css'

// pages


//* Payment
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);


function App() {
	const isLoggedIn = useSelector(store => store.AuthData.isLoggedIn);
	console.log(isLoggedIn)

	return (




		<React.Fragment>


				{/* start Routes of admin*/}

	//* TEMPORARY Payment code

		<Elements stripe={stripePromise}>
			<PaymentForm />
		</Elements>
			<Routes>
				<Route path="/home-page" element={<HomePage />} />
				<Route path="/" element={<Navigate to="/home-page" />} />

				<Route path="/register" element={<Register />} />
				<Route path="/login" element={<LoginPage />} />

				<Route path="/how-bid" element={<HowBidPage />} />
				<Route path="/about-us" element={<AboutUsPage />} />
				<Route path="/contact-us" element={<ContactUsPage />} />

				<Route path="/auctions" element={<ViewAuctions />} exact />
				<Route path="/categories" element={<ViewCategoryAuctions />} />

{		isLoggedIn &&		<Route path="/adminDashboard" element={<AdminPage />} />
}				<Route path="/adminDashboard/adminProfile" element={<ProfilePage />} />
				<Route
					path="/adminDashboard/ongoingAuctions"
					element={<OngoingAuctionsPage />}
				/>
				<Route
					path="/adminDashboard/currentAuctions"
					element={<CurrentAuctionsPage />}
				/>
				<Route path="/adminDashboard/allUsersPage" element={<UsersPage />} />
				<Route path="/adminDashboard/sellersPage" element={<SellersPage />} />
				<Route path="/adminDashboard/buyersPage" element={<BuyersPage />} />
				<Route path="/" element={<Navigate to="/home-page" />} />
				<Route path="/how-bid" element={<HowBidPage />} />
				<Route path="/about-us" element={<AboutUsPage />} />
				<Route path="/contact-us" element={<ContactUsPage />} />
				<Route path="/auctions" element={<ViewAuctions />} exact />
				<Route path="/categories" element={<ViewCategoryAuctions />} />
				<Route path="*" element={<PageNotFound />} />
			</Routes>
		</React.Fragment>

	);
}

export default App;
