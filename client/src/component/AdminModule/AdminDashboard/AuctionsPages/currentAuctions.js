import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import useHttp from '../../../../CustomHooks/useHttp';
import moment from 'moment';
import TableLayout from '../../../UI/TableLayout/TableLayout';
import { getAllAuctions } from '../../../../Api/Admin';
import AuctionDetails from './../../../Auctions/ViewCurrentAuction/AuctionDetails';

import useFilter from '../../../UI/TableLayout/FilteringTable/filter';
import DataTable from 'react-data-table-component';
import AdminDashboard from '../home/adminDashboard';
import PageContent from '../../../UI/DashboardLayout/Pagecontant/pageContent';
import PageHeader from '../../../UI/Page Header/pageHeader';

const CurrentAuctionsPage = () => {
	const idToken = useSelector(store => store.AuthData.idToken);

	const { sendRequest, status: statusForGet, data, error } = useHttp(
		getAllAuctions,
	);
	let neededData;
	if (statusForGet === 'completed') {
		neededData = data.map(auction => {
			return {
				name: auction.title,
				basePrice: auction.basePrice,
				startDate: auction.startDate,
				endDate: auction.endDate,
				seller: auction.seller.name,
				status: auction.status,
			};
		});
	}

	useEffect(() => {
		sendRequest(idToken);
	}, [sendRequest]);
	const [ongoingAuctions, setOngoingAuctions] = useState([]);
	useEffect(() => {
		if (statusForGet === 'completed') {
			const ongoingAuctions = neededData.filter(
				neededData => neededData.status === 'ongoing',
			);
			ongoingAuctions.map(data => {
				const newStartDate = moment(data.startDate).format(' DD / MM / YYYY');
				const newEndDate = moment(data.endDate).format(' DD / MM / YYYY');

				data.startDate = newStartDate;
				data.endDate = newEndDate;
			});

			setOngoingAuctions(ongoingAuctions);
		}
	}, [statusForGet]);

	const columns = [
		{
			name: 'Title',
			selector: row => row.name,
			sortable: true,
		},
		{
			name: 'Base Price',
			selector: row => row.basePrice,
		},
		{
			name: 'Start Date',
			selector: row => row.startDate,
		},
		{
			name: 'End Date',
			selector: row => row.endDate,
		},
		{
			name: 'Seller',
			selector: row => row.seller,
		},
		{
			name: 'Status',
			selector: row => row.status,
		},
		{
			name: 'Actions',
			// selector: row => row.action,
			cell: props => {
				return (
					<span className="text-info">
						<Link to="#">Auction Details</Link>
					</span>
				);
			},
		},
	];
	//filter
	const items = ongoingAuctions ? ongoingAuctions : [];
	const { filterFun, filteredItems } = useFilter(items);

	console.log({ filteredItems });
	//end filter

	return (
		<React.Fragment>
			<AdminDashboard>
				<PageContent>
					<PageHeader text="Current Auctions" showLink={false} />{' '}
					{neededData && (
						<DataTable
							columns={columns}
							data={filteredItems}
							subHeader
							subHeaderComponent={filterFun}
							theme="dark"
							pagination
						/>
					)}
				</PageContent>
			</AdminDashboard>
		</React.Fragment>
	);
};

export default CurrentAuctionsPage;
