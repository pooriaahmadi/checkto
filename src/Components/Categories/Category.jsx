import Database from "../../Database";
import Property from "../Properties/Property";
import NewPropertyPopup from "../Popups/NewPropertyPopup";
import { useEffect, useState } from "react";

const Category = ({
	title,
	checklist,
	id,
	database,
	setCategories,
	categories,
	reset,
}) => {
	const [isPopupActive, setIsPopupActive] = useState(false);
	const [properties, setProperties] = useState([]);
	const [isContextMenu, setIsContextMenu] = useState(false);
	useEffect(() => {
		const stuff = async () => {
			try {
				const properties = (
					await Database.Properties.all({ db: database })
				).filter((property) => property.category === id);
				setProperties(properties);
			} catch (error) {
				console.log("Database is not ready yet");
			}
		};
		stuff();
	}, [database]);
	const togglePopup = () => {
		setIsPopupActive(!isPopupActive);
	};
	const handleDelete = async () => {
		await Database.Categories.delete({
			db: database,
			id,
		});
		setCategories(categories.filter((category) => category.id !== id));
	};
	const onContextMenu = (e) => {
		if (
			e.target.classList.contains("category") ||
			e.target.classList.contains("bottom") ||
			e.target.classList.contains("context-menu")
		) {
			e.preventDefault();
			setIsContextMenu(!isContextMenu);
		}
	};
	return (
		<div className="category" onContextMenu={onContextMenu}>
			<div className={"context-menu" + (isContextMenu ? " active" : "")}>
				<h2>Do you want to delete this category?</h2>
				<div className="yes-no">
					<button
						style={{ backgroundColor: "#56E224" }}
						onClick={handleDelete}
					>
						Yes
					</button>
					<button
						style={{ backgroundColor: "rgb(209, 26, 42)" }}
						onClick={onContextMenu}
					>
						No
					</button>
				</div>
			</div>
			{isPopupActive && (
				<NewPropertyPopup
					category={id}
					database={database}
					handleClick={togglePopup}
					properties={properties}
					setProperties={setProperties}
				/>
			)}
			<div className="top">
				<h1>{title}</h1>
				<button onClick={onContextMenu}>Delete</button>
			</div>
			<div className="bottom">
				{properties.map((property) => (
					<Property
						{...property}
						key={property.id}
						database={database}
						properties={properties}
						setProperties={setProperties}
						reset={reset}
					/>
				))}
				<div className="property new-property" onClick={togglePopup}>
					<h2>New property</h2>
				</div>
			</div>
		</div>
	);
};

export default Category;
