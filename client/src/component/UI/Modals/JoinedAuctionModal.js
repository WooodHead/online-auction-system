import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import useHttp from '../../../CustomHooks/useHttp';
import { useSelector } from 'react-redux';

import ModalUi from '../Modal/modal';
import LoadingSpinner from '../Loading/LoadingSpinner';
import './WarnModal.css';
import { getJoinedAuctions } from '../../../Api/BuyerApi';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';
import useFilter from '../TableLayout/FilteringTable/filter';

const JoinedAuctionModal = ({ buyerId, show, onHide }) => {
	const idToken = useSelector(store => store.AuthData.idToken);

	const { sendRequest, status, data, error } = useHttp(getJoinedAuctions);
	const [loading, setLoading] = useState(false);

	const ModalTitle = 'View Joined Auctions';

	// start get all Joined Actions
	useEffect(() => {
		sendRequest({ idToken, buyerId });
	}, [sendRequest]);

	useEffect(() => {
		if (status === 'error') {
			setLoading(false);
			toast.error(error);
		}
	}, [status]);

	const [joinedAuctions, setJoinedAuctions] = useState([]);
	useEffect(() => {
		if (data && status === 'completed') {
			setJoinedAuctions(data && data.joinedAuctions);
			setLoading(false);
		}
	}, [status]);
	// end get all Joined Actions

	const columns = [
		{
			name: 'Title',
			selector: row => row.title,
			sortable: true,
			center: true,
		},
		{
			name: 'Base Price',
			selector: row => row.basePrice,
			center: true,
		},
		{
			name: 'Status',
			selector: row => row.status,
			center: true,
		},
		{
			name: 'Category',
			selector: row => row.category.name,
			center: true,
			cell: props => {
				return (
					<span className="text-info">
						<Link
							to={`/categories?id=${props.category._id && props.category._id}`}
						>
							{props.category.name}
						</Link>
					</span>
				);
			},
		},
		{
			name: 'Winning Buyer',
			selector: row => (row.winningBuyer ? row.winningBuyer : 'not selected'),
			center: true,
		},
		{
			name: 'Seller',
			center: true,
			cell: props => {
				return (
					<span className="text-info">
						<Link
							to={`/sellerProfile?id=${props.seller._id && props.seller._id}`}
						>
							{props.seller.name}{' '}
						</Link>
					</span>
				);
			},
		},
		{
			name: 'View Details',
			cell: props => {
				return (
					<span className="text-info ">
						<Link to={`/auctions?id=${props._id && props._id}`}>
							Auction Details
						</Link>
					</span>
				);
			},
		},
	];

	const items = joinedAuctions && joinedAuctions ? joinedAuctions : [];
	console.log(items);
	const { filterFun, filteredItems } = useFilter(items, 'title');

	// start View Joined Auctions
	const ViewJoinedAuctions =
		filteredItems && (
			<DataTable
				columns={columns}
				data={filteredItems}
				subHeader
				subHeaderComponent={filterFun}
				theme="dark"
				pagination
			/>
		) 

	// end View Joined Auctions

	return (
		<>
			{loading && <LoadingSpinner />}

			<ModalUi
				show={show}
				onHide={onHide}
				title={ModalTitle}
				body={ViewJoinedAuctions}
				btnName=""
				className="JoinedAuctionModal"
			/>
		</>
	);
};

export default JoinedAuctionModal;
