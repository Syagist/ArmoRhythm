import React from 'react';
import {MenuItem, Select} from "@mui/base";

const LanguageSelect = () => {
    const handleLanguageSelection = () => {
    };

    return (
        <div>
            <Select onChange={handleLanguageSelection} defaultValue={10} id="named-select" name="demo-select">
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
            </Select>
        </div>
    );
};

export default LanguageSelect;