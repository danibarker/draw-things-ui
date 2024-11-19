import { useEffect, useState } from "react";
import styled from "styled-components";

const SavedImages = () => {
	const [page, setPage] = useState(1);
	const [numOfPages, setNumOfPages] = useState(0);
	const [images, setImages] = useState<string[]>([]);
	const [query, setQuery] = useState("");
	useEffect(() => {
		const getSavedImages = async () => {
			let url;
			if (query) {
				url = `/api/images/saved?page=${page}&query=${query}`;
			} else {
				url = `/api/images?page=${page}`;
			}

			const res = await fetch(url);
			const data = await res.json();
			setImages(data.images);
			setNumOfPages(data.numOfPages);
		};
		getSavedImages();
	}, [page, query]);
	return (
		<div>
			<input
				type="text"
				placeholder="Search by filename"
				value={query}
				onChange={e => setQuery(e.target.value)}
			/>
			<Images>
				{images.map((image: string) => (
					<img src={`/api/images/saved?filename=${image}`} alt={image} />
				))}
				<Paginaters>
					<button
						disabled={page === 1}
						onClick={() => setPage((prev: number) => prev - 1)}
					>
						Prev
					</button>
					{page > 3 && (
						<button onClick={() => setPage((prev: number) => prev - 3)}>
							{page - 3 < 1 ? 1 : page - 3}
						</button>
					)}
					{page > 2 && (
						<button onClick={() => setPage((prev: number) => prev - 2)}>
							{page - 2 < 1 ? 1 : page - 2}
						</button>
					)}
					{page > 1 && (
						<button onClick={() => setPage((prev: number) => prev - 1)}>
							{page - 1 < 1 ? 1 : page - 1}
						</button>
					)}
					<button>{page}</button>
					{page < numOfPages && (
						<button onClick={() => setPage((prev: number) => prev + 1)}>
							{page + 1 > numOfPages ? numOfPages : page + 1}
						</button>
					)}
					{page < numOfPages - 1 && (
						<button onClick={() => setPage((prev: number) => prev + 2)}>
							{page + 2 > numOfPages ? numOfPages : page + 2}
						</button>
					)}
					{page < numOfPages - 2 && (
						<button onClick={() => setPage((prev: number) => prev + 3)}>
							{page + 3 > numOfPages ? numOfPages : page + 3}
						</button>
					)}
					<button
						disabled={page === numOfPages}
						onClick={() => setPage((prev: number) => prev + 1)}
					>
						Next
					</button>
				</Paginaters>
			</Images>
		</div>
	);
};

export default SavedImages;

const Paginaters = styled.div`
	display: grid;
	justify-content: center;
	grid-template-columns: 2fr repeat(7, 1fr) 2fr;
	margin-top: 10px;
	button {
		margin: 0 5px;
	}
`;

const Images = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
	gap: 10px;
	img {
		width: 100%;
	}
`;
