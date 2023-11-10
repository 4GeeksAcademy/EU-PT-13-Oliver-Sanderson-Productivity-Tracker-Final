import React from "react";

const Navbar = () => {
	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
			<a className="navbar-brand" href="#">KorYoku</a>
			<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
				<span className="navbar-toggler-icon"></span>
			</button>
			<div className="collapse navbar-collapse" id="navbarNav">
				<ul className="navbar-nav ml-auto">

					<li className="nav-item">
						<a className="nav-link" href="#">Home</a>
					</li>
					<li className="nav-item">
						<a className="nav-link" href="#">DashBoard</a>
					</li>
					<li className="nav-item">
						<a className="nav-link" href="#">Contact Us</a>
					</li>

				</ul>
			</div>
		</nav>
	);
};
export default Navbar;