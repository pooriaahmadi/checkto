import plus from "../../assets/images/plus.svg";
import "../../assets/scss/newchecklistpopup.scss";
import { useState } from "react";
import Database from "../../Database";

const EditCategoryPopup = ({
	handleClick,
	database,
	categories,
	setCategories,
	id,
	initialTitle,
}) => {
	const [title, setTitle] = useState(initialTitle);
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (title == "") {
			return;
		}
		await Database.Categories.update({
			db: database,
			id: id,
			newData: {
				title: title,
			},
		});
		setCategories(
			categories.map((category) => {
				if (category.id === id) {
					return { ...category, title: title };
				}
				return category;
			})
		);
		handleClick();
	};
	const handleTitleChange = (e) => {
		setTitle(e.target.value);
	};
	return (
		<div className="dark-matter">
			<div className="new-checklist">
				<div className="top">
					<h1>Edit Category</h1>
					<img onClick={handleClick} src={plus} alt="" />
				</div>
				<form onSubmit={handleSubmit} className="bottom">
					<h1>Title:</h1>
					<input
						type="text"
						value={title}
						onChange={handleTitleChange}
					/>
					<input type="submit" value="Update" />
				</form>
			</div>
		</div>
	);
};

export default EditCategoryPopup;
