import React from 'react';
import {TrackProgressProps} from "../../types/components/trackProgressProps";

const TrackProgress: React.FC<TrackProgressProps> =
    ({
         left, right, onChange
     }) => {
        return (
            <div style={{display: 'flex'}}>
                <input
                    type="range"
                    min={0}
                    max={right}
                    value={left}
                    onChange={onChange}
                />
                <div>{left} / {right}</div>
            </div>
        );
    };

export default TrackProgress;
