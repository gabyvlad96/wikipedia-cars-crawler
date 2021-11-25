import './skeletonComponents.css';

export const DetailsSkeletonComponent = () => {
	const TextSkeleton = () => (
		<div className="skeleton-field">
			<div className="skeleton skeleton-text skeleton-heading" />
			<div className="skeleton skeleton-text" />
		</div>
  );
	return (
		<>
			<div className="card">
					<div className="skeleton skeleton-image"></div>
			</div>
			<div className="card skeleton-info">
				{Array.from({length: 3}).map((_, index) => <TextSkeleton key={index} />)}
			</div>
		</>
	)
}

export const ListSkeletonComponent = () => {
	return (
		<>
			<div className="skeleton-list">
				{Array.from({length: 12}).map((_, index) => (
          <div className="skeleton skeleton-list-item" key={index} />
        ))}
			</div>
		</>
	)
}