import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/models/users/shared-user/schema/user.schema';
import { CreateTransactionDto } from './dto';

import { Transaction, TransactionDocument } from './schema';

@Injectable()
export default class TransactionService {
	private logger: Logger = new Logger(TransactionService.name);

	constructor(
		@InjectModel(Transaction.name)
		private readonly transactionModel: Model<TransactionDocument>,
	) {}

	/**
	 * Create new transaction
	 * @param createTransactionDto
	 * @return created transaction if done successfully
	 */
	async createTransaction(createTransactionDto: CreateTransactionDto) {
		const createTransaction = new this.transactionModel(createTransactionDto);

		if (!createTransaction) {
			throw new Error('Cannot create transaction right now ❌❌');
		}

		this.logger.debug('New transaction created and saved in db. ✔✔');

		await createTransaction.save();

		return createTransaction;
	}

	async listTransactionsForUser(user: any) {
		return this.transactionModel
			.find({
				$or: [{ sender: user._id }, { recipient: user._id }],
			})
			.sort([['createdAt', -1]])
			.exec();
	}

	/**
	 * Get the amount of money in a transaction
	 * @param paymentIntentId
	 */
	async getTransactionAmount(paymentIntentId: string): Promise<number> {
		const transaction = await this.transactionModel.findOne({
			paymentIntentId,
		});

		return transaction.amount;
	}
}
