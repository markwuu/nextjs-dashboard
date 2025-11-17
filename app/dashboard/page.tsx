import { fetchCardData, fetchLatestInvoices, fetchRevenue } from '../lib/data';
import { Card } from '../ui/dashboard/cards';
import LatestInvoices from '../ui/dashboard/latest-invoices';
import RevenueChart from '../ui/dashboard/revenue-chart';
import { lusitana } from '../ui/fonts';

export default async function Page() {
	// data requests will unintentionally block each other creating a waterfall request
	// instead of running all requests in parallel
	// const revenue = await fetchRevenue();
	// const latestInvoices = await fetchLatestInvoices();
	// const {
	//   numberOfCustomers,
	//   numberOfInvoices,
	//   totalPaidInvoices,
	//   totalPendingInvoices,
	// } = await fetchCardData();

	// using Promise.all we can run these requests in parallel (at the same time)
	const [revenue, latestInvoices, cardData] = await Promise.all([
		fetchRevenue(),
		fetchLatestInvoices(),
		fetchCardData(),
	]);
	const {
		numberOfCustomers,
		numberOfInvoices,
		totalPaidInvoices,
		totalPendingInvoices,
	} = cardData;

	return (
		<main>
			<h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
				Dashboard
			</h1>
			<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
				<Card
					title="Collected"
					value={totalPaidInvoices}
					type="collected"
				/>
				<Card
					title="Pending"
					value={totalPendingInvoices}
					type="pending"
				/>
				<Card
					title="Total Invoices"
					value={numberOfInvoices}
					type="invoices"
				/>
				<Card
					title="Total Customers"
					value={numberOfCustomers}
					type="customers"
				/>
			</div>
			<div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
				<RevenueChart revenue={revenue} />
				<LatestInvoices latestInvoices={latestInvoices} />
			</div>
		</main>
	);
}
