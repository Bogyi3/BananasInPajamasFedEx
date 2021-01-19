import React, { useState } from 'react';
import './commitmentPage.css';
import Arrow from '../../assets/drop-menu-arrow.png';

function CommitmentPage() {
  const [showCompletedMenu, setShowCompletedMenu] = useState(false);
  const [showAddMenu, setShowAddMenu] = useState(false);

  function toggleCompletedMenu(e) {
    e.preventDefault();
    if (showCompletedMenu) {
      setShowCompletedMenu(false);
    } else {
      setShowCompletedMenu(true);
    }
  }

  function toggleAddMenu(e) {
    e.preventDefault();
    if (showAddMenu) {
      setShowAddMenu(false);
    } else {
      setShowAddMenu(true);
    }
  }

  return (
    <div>
      <div className="drop-down-item user-commitments">
        <button type="button" onClick={toggleCompletedMenu} onKeyDown={toggleCompletedMenu}>
          <div className="drop-down-header">
            <img className={showCompletedMenu ? 'rotated-arrow arrow-down' : 'arrow-down'} src={Arrow} alt="drop down menu" />
            <h1>Completed commitments</h1>
          </div>
        </button>
        <div className={showCompletedMenu ? 'toggle' : 'hidden'}>
          {/* itt majd egy .map lesz */}
          <div className="commitment-item">
            <div className="completion-date">Date</div>
            <div className="commitment-name header-name">Name of Activity</div>
            <div className="commitment-xp">XP</div>
          </div>
          <div className="commitment-item">
            <div className="completion-date">
              <span className="month">jan</span>
              <span className="day">1</span>
            </div>
            <div className="commitment-name">Power yoga 30 min</div>
            <div className="commitment-xp">30</div>
          </div>
          <div className="commitment-item">
            <div className="completion-date">
              <span className="month">jan</span>
              <span className="day">1</span>
            </div>
            <div className="commitment-name">Power yoga 30 min</div>
            <div className="commitment-xp">30</div>
          </div>
        </div>
      </div>
      <div className="drop-down-item add-commitment">
        <button type="button" onClick={toggleAddMenu} onKeyDown={toggleAddMenu}>
          <div className="drop-down-header">
            <img className={showAddMenu ? 'rotated-arrow arrow-down' : 'arrow-down'} src={Arrow} alt="drop down menu" />
            <h1>Add commitments</h1>
          </div>
        </button>
        <div className={showAddMenu ? 'toggle' : 'hidden'}>
          {/* itt is majd egy .map lesz */}
          <div className="commitment-item">
            <div className="commitment-name">Meditate</div>
            <div className="commitment-xp">30</div>
          </div>
        </div>
      </div>
      <div className="ongoing-commitments">
        <h1>Ongoing commitments</h1>
        <div className="ongoing-items">
          <div className="commitment-item">
            <div className="commitment-date">feb 1.</div>
            <div className="commitment-name">Walk 30 min</div>
            <div className="commitment-xp">10 xp</div>
          </div>
          <div className="commitment-item">
            <div className="commitment-date">feb 1.</div>
            <div className="commitment-name">Walk 30 min</div>
            <div className="commitment-xp">10 xp</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommitmentPage;
