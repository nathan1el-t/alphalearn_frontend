"use client"

import { showSuccess } from "@/lib/notifications"

export default function test(){
    return(
        <div>
            <button className="border" onClick={()=>{showSuccess("testing")}}>testing</button>
            <h1>wow such empty</h1>
        </div>
    )
}