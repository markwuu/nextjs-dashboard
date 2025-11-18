// 🚀 IMPORTANT CONCEPT 🚀 //
// STREAMING ==> loading.tsx is built on top of React Suspense and sent first as a static file
// then dynamic content is STREAMED from server to client as it becomes available
// ROUTE GROUPS ==> create folder with parantheses around its name with loading.tsx file
// so that loading UI is shown only for that specific route group (only applies to /dashboard)
// BENEFITS ==> singular data request won't block whole page from loading and improves user experience
// OVERVIEW OF WHAT HAPPENS ==>
// 	 1. User navigates to /dashboard
// 	 2. loading.tsx is sent first as static content (DashboardSkeleton shows immediately to the user)
// 	 3. Meanwhile, server starts rendering page.tsx and its child components
// 	 4. As each component's data is ready, it's streamed to client and hydrated
//	    a. CardWrapper, RevenueChart, LatestInvoices (components appear on page when data is ready)
import DashboardSkeleton from '../../ui/skeletons';

export default function Loading() {
	return <DashboardSkeleton />;
}
