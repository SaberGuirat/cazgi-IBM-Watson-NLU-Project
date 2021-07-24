import React from "react";
import "./bootstrap.min.css";

class EmotionTable extends React.Component {
  render() {
    return (
      <div>
        <table className="table table-bordered">
          <tbody>
            {this.props.emotions.map((keyword) => (
              <>
                <tr>
                  <td>sadness</td>
                  <td>{keyword.emotion.sadness}</td>
                </tr>
                <tr>
                  <td>joy</td>
                  <td>{keyword.emotion.joy}</td>
                </tr>
                <tr>
                  <td>fear</td>
                  <td>{keyword.emotion.fear}</td>
                </tr>
                <tr>
                  <td>disgust</td>
                  <td>{keyword.emotion.disgust}</td>
                </tr>
                <tr>
                  <td>anger</td>
                  <td>{keyword.emotion.anger}</td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
export default EmotionTable;
