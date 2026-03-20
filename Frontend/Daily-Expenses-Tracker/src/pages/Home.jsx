import { useNavigate } from "react-router-dom";

const Home = () => {
	const navigate = useNavigate();
	return (
		<>
			<div className="flex justify-center items-center h-screen">
				<div className="flex flex-col">
					<h1>This is home page navigate to login page</h1>
					<span
						className="text-5xl cursor-pointer"
						onClick={() => navigate("/Login")}
					>
						Login page
					</span>
				</div>
			</div>
		</>
	);
};

export default Home;
