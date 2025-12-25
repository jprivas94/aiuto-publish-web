import React from 'react';

const Header: React.FC = () => {
	return (
		<header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
				<div className="flex items-center space-x-3">
					<div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
						<i className="fa-solid fa-play text-white text-xl"></i>
					</div>
					<span className="text-xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
						VideoFlow Architect
					</span>
				</div>
				<nav className="hidden md:flex space-x-8">
					<a href="#" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
						Dashboard
					</a>
					<a href="#" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
						Biblioteca
					</a>
					<a href="#" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
						Configuración
					</a>
				</nav>
				<div className="flex items-center space-x-4">
					<button className="text-slate-400 hover:text-white transition-colors">
						<i className="fa-solid fa-bell"></i>
					</button>
					<div className="w-8 h-8 rounded-full bg-slate-700 border border-slate-600"></div>
				</div>
			</div>
		</header>
	);
};

export default Header;
