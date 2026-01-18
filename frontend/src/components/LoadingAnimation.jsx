import './LoadingAnimation.css';

const LoadingAnimation = () => {
    return (
        <div className="loading-container">
            <div className="spinner">
                <div className="spinner-ring ring-1"></div>
                <div className="spinner-ring ring-2"></div>
                <div className="spinner-ring ring-3"></div>
            </div>
            <div className="loading-text">
                ANALYZING NEURAL PATHWAYS...
            </div>
        </div>
    );
};

export default LoadingAnimation;
