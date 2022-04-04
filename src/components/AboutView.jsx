import React, { Component } from 'react';
import Pdf from '../assets/docs/telosbuild.pdf';

export default function AboutView(props) {
  return (
<div>
<center>
<div style={{marginTop: "20%", marginBottom: "20%"}}>
<a href = {Pdf} target = "_blank"><button className="btn btn-wide">PDF</button></a>
</div>
</center>
</div>
  );
}
