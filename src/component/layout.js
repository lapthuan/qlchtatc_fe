
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./navbar";
import Sidebar from "./silderbar";


const Layout = () => {


	return (

		<div>
			<Navbar />
	
			<div class="main">
				<aside class="d-flex">
					<Sidebar />

					<div class="w-100 m-4 body-color">
						<div class=" m-4">
							<Outlet />
						</div>

					</div>

				</aside>
			</div>


		</div>

	)
};

export default Layout;
