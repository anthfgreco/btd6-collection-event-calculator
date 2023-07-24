import PropTypes from "prop-types";

function TowerCard({ towerFileName, towerEnglishName }) {
  return (
    <div className="flex flex-col items-center rounded-lg border border-gray-300 bg-gray-100 p-3 shadow-md">
      <img
        src={`images/${towerFileName}.png`}
        alt={towerEnglishName}
        className="h-24 md:h-fit"
      />
      <p className="my-auto leading-snug">{towerEnglishName}</p>
    </div>
  );
}

TowerCard.propTypes = {
  towerFileName: PropTypes.string.isRequired,
  towerEnglishName: PropTypes.string.isRequired,
};

export default TowerCard;
