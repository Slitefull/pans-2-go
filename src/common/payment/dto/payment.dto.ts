export interface GetAllTransactionsDTO {
  data: {
    object: string;
    data: Array<Transaction>;
    has_more: boolean;
    url: string;
  }
}

interface Transaction {
  id: string;
  object: string;
  amount: number;
  available_on: number;
  created: number;
  currency: string;
  description: string | null;
  exchange_rate: string | number | null;
  fee: number;
  fee_details: Array<FeeDetails>;
  net: number;
  reporting_category: string;
  source: string;
  status: string;
  type: string;
}

interface FeeDetails {
  amount: number;
  application: string | number | null;
  currency: string;
  description: string;
  type: string;
}

export interface UpdatePaymentMethodPayload {
  cardType: string;
  cardNumbers: string;
  expDate: string;
  cardholderName: string;
  billingZipCode: string;
  rentalDamageCover: string;
}
