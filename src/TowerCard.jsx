import PropTypes from "prop-types";

function TowerCard({ towerFileName, towerEnglishName }) {
  return (
    <div className="flex flex-col items-center rounded-lg border border-gray-300 bg-gray-100 p-3 shadow dark:border-gray-700 dark:bg-gray-800">
      <img src={`images/${towerFileName}.png`} alt="alchemist" width="70" />
      <p>{towerEnglishName}</p>
    </div>
  );
}

TowerCard.propTypes = {
  towerFileName: PropTypes.string.isRequired,
  towerEnglishName: PropTypes.string.isRequired,
};

export default TowerCard;
