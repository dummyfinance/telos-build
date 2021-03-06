import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function CategoryView(props) {
  const navigate = useNavigate();
  const onClickFilter = (val) => {
    if (!props.isHome) {
      if (props.filter !== val) {
        props.changeCategory(val);
      } else {
        props.changeCategory(-1);
        document.getElementsByClassName("categoryItem")[val].blur();
      }
    } else {
      navigate("discover", {
        state: {
          selected: val,
        },
      });
    }
  };
  const setSelectedFocus = () => {
    props.filter !== -1 &&
      document.getElementsByClassName("categoryItem")[props.filter]?.focus();
  };
  useEffect(() => {
    setSelectedFocus();
  }, []);
  return (
    <div className="category">
      <div
        className="categoryItem"
        tabIndex="1"
        onClick={() => onClickFilter(0)}
      >
        {"Defi"}
      </div>
      <div
        className="categoryItem"
        tabIndex="1"
        onClick={() => onClickFilter(1)}
      >
        NFT
      </div>
      <div
        className="categoryItem"
        tabIndex="1"
        onClick={() => onClickFilter(2)}
      >
        Social
      </div>
      <div
        className="categoryItem"
        tabIndex="1"
        onClick={() => onClickFilter(3)}
      >
        Gaming
      </div>
      <div
        className="categoryItem"
        tabIndex="1"
        onClick={() => onClickFilter(4)}
      >
        Other
      </div>
    </div>
  );
}
