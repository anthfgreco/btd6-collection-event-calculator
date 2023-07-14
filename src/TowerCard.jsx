import PropTypes from "prop-types";

function TowerCard({ tower, towerEnglish }) {
  return (
    <div className="flex flex-col items-center rounded-lg border border-gray-300 bg-gray-100 p-3 shadow dark:border-gray-700 dark:bg-gray-800">
      <img src={`images/${tower}.png`} alt="alchemist" width="70" />
      <p>{towerEnglish}</p>
    </div>
  );
}

TowerCard.propTypes = {
  tower: PropTypes.string.isRequired,
  towerEnglish: PropTypes.string.isRequired,
};

export default TowerCard;
