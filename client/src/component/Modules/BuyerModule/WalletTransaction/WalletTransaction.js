import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Col,Row } from 'react-bootstrap';

import DataTable from 'react-data-table-component';

import { useSelector } from 'react-redux';
import { getWalletBalance, getWalletTransactions } from '../../../../Api/BuyerApi';
import useHttp from '../../../../CustomHooks/useHttp';

import PageContent from '../../../UI/DashboardLayout/Pagecontant/pageContent';
import LoadingSpinner from '../../../UI/Loading/LoadingSpinner';
import PageHeader from '../../../UI/Page Header/pageHeader'
import useFilter from '../../../UI/TableLayout/FilteringTable/filter';

import BuyerDashboardContent from '../BuyerDashboard';
import RecoverMoney from '../Payment/RecoverMoney';


const WalletTransaction = () => {
		// get num of widthdraw transaction
		const [n_widthdraw , setWithdrawNum] = useState('')
		const [n_deposite , setDepositeNum] = useState('')

		const [loading , setLoading] = useState(false)
		const [reload , setReload] = useState('')

		const [showRecoverModal , setShowRecoverModal] = useState(false)
		const [paymentIntentId , setPaymentIntentId] = useState('')



		// get wallet balance
		const idToken = useSelector(store=>store.AuthData.idToken)
		const {sendRequest , status , data} = useHttp(getWalletBalance);
		useEffect(()=>{
			sendRequest(idToken)
		},[sendRequest , reload])
		// end get wallet balance


		// start get wallet Transactions
		const {sendRequest:sendRequestForWalletTrans , status:statusForWalletTrans , data:dataForWalletTrans} = useHttp(getWalletTransactions);
		useEffect(()=>{
			sendRequestForWalletTrans(idToken)
		},[sendRequestForWalletTrans , reload])

		useEffect(()=>{
			if(status === 'pending'){
				setLoading(true)
			}
		},[status])

		// get num of withdraw and deposit transaction
		useEffect(()=>{
			if(statusForWalletTrans==='completed'){
				setDepositeNum(dataForWalletTrans.filter(trans => trans.transactionType==="deposit").length)
				setWithdrawNum(dataForWalletTrans.filter(trans => trans.transactionType==="withdrawal").length)
				setLoading(false)
			}
		},[statusForWalletTrans , reload , paymentIntentId])
		// end get wallet transaction

		const columns = [
			{
				name: 'Name',
				selector: row => row.sender.name,
				sortable: true,
			},
			{
				name: 'Role',
				selector: row => row.sender.role,
			},
			,
			{
				name: 'Transaction_Type',
				selector: row => row.transactionType,
			},
			{
				name: 'Actions',
				selector: row => row ,
				cell: props => {
					return (
						<>
						{props.transactionType === 'deposit' &&
							<button
							className="btn btn-danger my-2 "
							onClick={() => showRecoverModalHandler(props.paymentIntentId)}
							>
							<FontAwesomeIcon icon={faEdit} />
						</button>
						}

						</>
					);
				},
			},
		];

		// start Recover money Handler
		const showRecoverModalHandler = (value) => {
			setPaymentIntentId(value)
			setShowRecoverModal	(true)
		}
		const ReloadPageHandler = (value) => {
			setReload(value)
		}
		// end Recover money Handler


		//filter
		const items = dataForWalletTrans ? dataForWalletTrans : [];
		const { filterFun, filteredItems } = useFilter(items , 'transactionType');
		//end filter


	return (
		<BuyerDashboardContent>
			{loading && <LoadingSpinner></LoadingSpinner> }
			<PageContent>
				<PageHeader text ="Wallet Transactions" showLink={false} />
				<Row className='w-100 p-0 m-0 px-3 mb-5'>
					<Col lg="4" >
						<div className='w-100 my-4 pt-4 d-flex flex-column justify-content-center bg-dark text-light text-center rounded-3'>
							<h5 className='fw-bold pb-2'>  Withdraw Transactions </h5>
							<h5 className='bg-danger py-2 m-0'> {statusForWalletTrans==='completed'  && dataForWalletTrans && n_widthdraw} </h5>
						</div>
					</Col>

					<Col lg="4" >
						<div className='w-100 my-4 pt-4 d-flex flex-column justify-content-center bg-dark text-light text-center rounded-3'>
							<h5 className='fw-bold pb-2'>  Your Balance </h5>
							<h5 className='bg-primary py-2 m-0'> {status==='completed'  && data && data.balance} </h5>
						</div>
					</Col>
					<Col lg="4" >
						<div className='w-100 my-4 pt-4 d-flex flex-column justify-content-center bg-dark text-light text-center rounded-3'>
							<h5 className='fw-bold pb-2'>   Deposit Transactions</h5>
							<h5 className='bg-success py-2 m-0'> {statusForWalletTrans==='completed'  && dataForWalletTrans && n_deposite} </h5>
						</div>
					</Col>
				</Row>

				{/* start show all transaction in table */}
				{dataForWalletTrans && (
						<DataTable
							// selectableRows
							columns={columns}
							data={filteredItems}
							subHeader
							subHeaderComponent={filterFun}
							theme="dark"
							pagination
						/>
				)}
				{/* end show all transaction in table */}

				{/* start change deposit transaction into withdrawal [recover money] */}
				{showRecoverModal &&
				<RecoverMoney
					PaymentIntentId = {paymentIntentId}
					show = {showRecoverModal}
					onHide = {()=>setShowRecoverModal(false)}
					onReload = {ReloadPageHandler}
				/>
			}



			</PageContent>
		</BuyerDashboardContent>
	);
}

export default WalletTransaction;