import React, { useCallback } from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { action } from "@storybook/addon-actions";


export default {
  title: "Computools UI Kit/Calendar",
} as Meta;

const events = [
  {
    title: "Trainee Meeting",
    start: "2021-01-04T11:00:00",
    end: "2021-01-04T12:00:00",
  },
  {
    title: "Scrums",
    start: "2021-01-04T13:00:00",
    end: "2021-01-04T15:00:00",
  },
  {
    title: "Project #1 internal discussion",
    start: "2021-01-04T16:00:00",
    end: "2021-01-04T17:00:00",
  },
  {
    title: "Project #2 daily",
    start: "2021-01-04T17:00:00",
    end: "2021-01-04T17:30:00",
  },
  {
    title: "Trainee Meeting",
    start: "2021-01-05T11:00:00",
    end: "2021-01-05T12:00:00",
  },
  {
    title: "Scrums",
    start: "2021-01-05T13:00:00",
    end: "2021-01-05T15:00:00",
  },
  {
    title: "Technical interview",
    start: "2021-01-05T17:30:00",
    end: "2021-01-05T19:00:00",
  },
  {
    title: "Trainee Meeting",
    start: "2021-01-06T11:00:00",
    end: "2021-01-06T12:00:00",
  },
  {
    title: "Project #1 internal discussion",
    start: "2021-01-06T12:00:00",
    end: "2021-01-06T13:00:00",
  },
  {
    title: "Scrums",
    start: "2021-01-06T13:00:00",
    end: "2021-01-06T15:00:00",
  },
  {
    title: "Resource team meeting",
    start: "2021-01-06T16:30:00",
    end: "2021-01-06T16:45:00",
  },
  {
    title: "Project #2 daily",
    start: "2021-01-06T17:00:00",
    end: "2021-01-06T17:15:00",
  },
  {
    title: "Trainee Meeting",
    start: "2021-01-07T11:00:00",
    end: "2021-01-07T12:00:00",
  },
  {
    title: "Project #1 discussion",
    start: "2021-01-07T12:00:00",
    end: "2021-01-07T13:00:00",
  },
  {
    title: "Scrums",
    start: "2021-01-07T13:00:00",
    end: "2021-01-07T15:00:00",
  },
  {
    title: "Technical interview",
    start: "2021-01-07T15:00:00",
    end: "2021-01-07T16:30:00",
  },
  {
    title: "Project #1 internal discussion",
    start: "2021-01-07T16:30:00",
    end: "2021-01-07T17:30:00",
  },
  {
    title: "Trainee Meeting",
    start: "2021-01-08T11:00:00",
    end: "2021-01-08T12:00:00",
  },
  {
    title: "Scrums",
    start: "2021-01-08T13:00:00",
    end: "2021-01-08T15:00:00",
  },
  {
    title: "Team Meeting",
    start: "2021-01-08T15:00:00",
    end: "2021-01-08T16:00:00",
  },
  {
    title: "Project #2 daily",
    start: "2021-01-08T17:00:00",
    end: "2021-01-08T17:30:00",
  },
];

export const DayGridMonth: Story = () => {
  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      initialDate="2021-01-04"
      events={events}
    />
  );
};

export const DragNDropEvents: Story = () => {
  const eventDrop = useCallback((event) => {
    action("Event dropped")(event);
  }, []);

  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      initialDate="2021-01-04"
      events={events}
      editable
      eventDrop={eventDrop}
    />
  );
};
DragNDropEvents.storyName = "Drag'n'drop events";

export const TimeGridWeek = () => {
  return (
    <FullCalendar
      plugins={[timeGridPlugin]}
      initialView="timeGridWeek"
      initialDate="2021-01-04"
      events={events}
    />
  );
};
