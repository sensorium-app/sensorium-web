import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './timeline.css';
class Timeline extends Component {
  render() {
    return (
           <div className="container">
  <div className="page-header">
    <h1 id="timeline">Timeline</h1>
  </div>
  <ul className="timeline">
    <li>
      <div className="timeline-badge"><i className="glyphicon glyphicon-check"></i></div>
      <div className="timeline-panel">
        <div className="timeline-heading">
          <h4 className="timeline-title">Lorem Ipsum</h4>
          <p><small className="text-muted"><i className="glyphicon glyphicon-time"></i>jhasvfh</small></p>
        </div>
        <div className="timeline-body">
          <p>Mussum ipsum cacilds, vidis litro abertis. Consetis adipiscings elitis. Pra lá , depois divoltis porris, paradis. Paisis, filhis, espiritis santis.</p>
        </div>
      </div>
    </li>
    <li className="timeline-inverted">
      <div className="timeline-badge warning"><i className="glyphicon glyphicon-credit-card"></i></div>
      <div className="timeline-panel">
        <div className="timeline-heading">
          <h4 className="timeline-title">Mussum ipsum cacilds</h4>
        </div>
        <div className="timeline-body">
          <p>Mussum ipsum cacilds, vidis litro abertis. Consetis adipiscings elitis. Pra lá , depois divoltis porris, paradis. Paisis, filhis, espiritis santis. Mé faiz elementum girarzis, nisi eros vermeio, in elementis mé pra quem é amistosis quis leo.
            Manduma pindureta quium di</p>
        </div>
      </div>
    </li>
    <li>
      <div className="timeline-badge danger"><i className="glyphicon glyphicon-credit-card"></i></div>
      <div className="timeline-panel">
        <div className="timeline-heading">
          <h4 className="timeline-title">Mussum ipsum cacilds</h4>
        </div>
        <div className="timeline-body">
          <p>Mussum ipsum cacilds,i pareci latim. Interessantiss quisso pudia ce receita de bolis, mais bolis eu num gostis.</p>
        </div>
      </div>
    </li>
    <li className="timeline-inverted">
      <div className="timeline-panel">
        <div className="timeline-heading">
          <h4 className="timeline-title">Mussum ipsum cacilds</h4>
        </div>
        <div className="timeline-body">
          <p>Mussum ipsum cacilds, vidpareci latim. Interessantiss quisso pudia ce receita de bolis, mais bolis eu num gostis.</p>
        </div>
      </div>
    </li>
    <li>
      <div className="timeline-badge info"><i className="glyphicon glyphicon-floppy-disk"></i></div>
      <div className="timeline-panel">
        <div className="timeline-heading">
          <h4 className="timeline-title">Mussum ipsum cacilds</h4>
        </div>
        <div className="timeline-body">
          <p>Mussum ipsum cacilds, vidis litroi palavris qui num significa nadis i pareci latim. Interessantiss quisso pudia ce receita de bolis, mais bolis eu num gostis.</p>
       
         
        </div>
      </div>
    </li>
    <li>
      <div className="timeline-panel">
        <div className="timeline-heading">
          <h4 className="timeline-title">Mussum ipsum cacilds</h4>
        </div>
        <div className="timeline-body">
          <p>Mussum ipsum cacilds, vidis li in monti palavris qui num significa nadis i pareci latim. Interessantiss quisso pudia ce receita de bolis, mais bolis eu num gostis.</p>
        </div>
      </div>
    </li>
    <li className="timeline-inverted">
      <div className="timeline-badge success"><i className="glyphicon glyphicon-thumbs-up"></i></div>
      <div className="timeline-panel">
        <div className="timeline-heading">
          <h4 className="timeline-title">Mussum ipsum cacilds</h4>
        </div>
        <div className="timeline-body">
          <p>Mussum ipsum cacilds, vidis  nadis i pareci latim. Interessantiss quisso pudia ce receita de bolis, mais bolis eu num gostis.</p>
        </div>
      </div>
    </li>
  </ul>
</div>
        
    );
  }
}

export default Timeline;
