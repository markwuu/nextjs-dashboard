import { Suspense } from 'react';
import {
	CardsSkeleton,
	LatestInvoicesSkeleton,
	RevenueChartSkeleton,
} from '@/app/ui/skeletons';
import CardWrapper, { Card } from '@/app/ui/dashboard/cards';
import { lusitana } from '@/app/ui/fonts';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
// import { fetchCardData } from '@/app/lib/data';

export default async function Page() {
	// 🚀 IMPORTANT CONCEPT ON SPEEDING UP PAGE DUE TO SLOW DATA REQUESTS 🚀 //
	// data requests will unintentionally block each other creating a waterfall request
	// so fetchRevenue would need to finish before fetchLatestInvoices can start
	// then fetchLatestInvoices would need to finish before fetchCardData can start
	// leading to really long wait times 😭 😭 😭
	// instead of running all requests in parallel like this:
	// const revenue = await fetchRevenue();
	// const latestInvoices = await fetchLatestInvoices();
	// const {
	//   numberOfCustomers,
	//   numberOfInvoices,
	//   totalPaidInvoices,
	//   totalPendingInvoices,
	// } = await fetchCardData();

	// using Promise.all we can run these requests in parallel (all at the same time!)
	// BUT we still have to wait for all these requests to finish before we can render
	// the page which can lead to longer wait times for the user 🥲 🥲 🥲
	// to see anything on the screen
	// const {
	// 	numberOfCustomers,
	// 	numberOfInvoices,
	// 	totalPaidInvoices,
	// 	totalPendingInvoices,
	// } = await fetchCardData();

	// 🚀 IMPORTANT CONCEPT ON SOLVING SLOW REQUESTS CAUSING SLOW PAGE RENDERS 🚀 //
	// THERE'S A SOLUTION TO THIS THOUGH! 🎉 🎉 🎉
	// Using React Suspense we can stream in parts of the page
	// as their data requests complete instead of waiting for everything
	// to be ready before showing anything to the user.

	return (
		<main>
			<h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
				Dashboard
			</h1>
			<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
				{/* <Card
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
				/> */}
				{/* 
					🚀 IMPORTANT CONCEPT ON GROUPING COMPONENTS WITH SUSPENSE 🚀
					We could wrap each individual Card component in Suspense, but that
					may cause the cards to pop in sporadically which can be jarring for users.
					Instead, we wrap all the cards in a single Suspense component so they
					all appear at once when ready.
				 */}
				<Suspense fallback={<CardsSkeleton />}>
					<CardWrapper />
				</Suspense>
			</div>
			<div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
				{/* 
					🚀 IMPORTANT CONCEPT ON HARNESSING SUSPENSE COMPONENTS & STREAMING🚀
					RevenueChart and LatestInvoices are wrapped in Suspense components
					so they can be streamed separately as their data becomes available.
					Without Suspense here, the entire page would wait for both data requests
					to complete before rendering, leading to longer wait times.
					Both components would run in parallel, so the total wait time would
					be determined by the slower of the two requests.
				 */}
				<Suspense fallback={<RevenueChartSkeleton />}>
					<RevenueChart />
				</Suspense>
				<Suspense fallback={<LatestInvoicesSkeleton />}>
					<LatestInvoices />
				</Suspense>
			</div>
		</main>
	);
}
