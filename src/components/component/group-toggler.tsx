"use client"

import * as React from "react";
import { useState, useEffect } from "react";

export function GroupToggler() {

    return (
        /* From Uiverse.io by guilhermeyohan */ 
        <div className="checkbox-apple">
            <input className="yep" id="check-apple" type="checkbox" />
            <label htmlFor="check-apple"></label>
        </div>
    );
}