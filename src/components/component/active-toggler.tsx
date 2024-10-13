"use client"

import * as React from "react";
import { useState, useEffect } from "react";

export function ActiveToggler() {

    return (
        <label className="switch">
            <input type="checkbox" />
                <div className="slider"></div>
                <div className="slider-card">
                    <div className="slider-card-face slider-card-front"></div>
                    <div className="slider-card-face slider-card-back"></div>
                </div>
        </label>
    );
}
