import React, { Component } from "react";

export class ResponsivePlayer extends Component {
  render() {
    return (
      <div className="mb-3">
        <video
          className="rounded-md"
          width="100%"
          height="100%"
          controls
          autoPlay
          src={this.props.video}
        ></video>
      </div>
    );
  }
}
