"use client";
import { useState } from "react";
import React from "react";

// type to safely read React synthetic private fields
type ReactEventWithInternals = React.MouseEvent<HTMLButtonElement> & {
  _reactName?: string;
  _targetInst?: unknown;
};

type EventValue = string | number | boolean | null | Record<string, unknown>;

type EventData = Record<string, EventValue> | null;

export default function EventObject() {
  const [eventData, setEventData] = useState<EventData>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const evt = e as ReactEventWithInternals;

    const safeEvent: EventData = {
      _reactName: evt._reactName ?? null,
      _targetInst: evt._targetInst ? String(evt._targetInst) : null,
      type: evt.type,
      nativeEvent: { isTrusted: evt.nativeEvent.isTrusted },
      target: (evt.target as HTMLElement).outerHTML,
      currentTarget: null,
      eventPhase: evt.eventPhase,
      bubbles: evt.bubbles,
      cancelable: evt.cancelable,
      timeStamp: evt.timeStamp,
      defaultPrevented: evt.defaultPrevented,
      isTrusted: evt.isTrusted,
      detail: evt.detail,
      screenX: evt.screenX,
      screenY: evt.screenY,
    };

    setEventData(safeEvent);
  };

  return (
    <div id="wd-event-object">
      <h2>Event Object</h2>

      <button
        onClick={handleClick}
        className="btn btn-primary"
        id="wd-display-event-obj-click"
      >
        Display Event Object
      </button>

      <pre>{eventData ? JSON.stringify(eventData, null, 2) : ""}</pre>

      <hr />
    </div>
  );
}