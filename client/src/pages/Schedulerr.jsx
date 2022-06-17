import * as React from "react";
import { withRouter } from "react-router";
import PageHeader from "../components/PageHeader";
import AddTaskPopUp from "../components/AddTaskPopUp";
import Approaching from "../components/Approaching";
import { Button } from "react-bootstrap";
import OverlappingEvents from "../components/OverlappingEvents";
import {
  Scheduler,
  TimelineView,
  DayView,
  WeekView,
  MonthView,
  AgendaView,
} from "@progress/kendo-react-scheduler";
import { guid } from "@progress/kendo-react-common";
import apis from "../api";

const displayDate = new Date();
const modelFields = {
  id: "TaskId",
  title: "Title",
  start: "Start",
  end: "End",
  description: "Description"
};

class Schedulerr extends React.Component {
  state = {
    showAddTask: false,
    data: [],
    mappedData: [],
    showSuggestions: false,
    showApproachings: false,
    Updated: {},
    scheduled:[]
  };

  async componentDidMount() {
    if (!localStorage.getItem("token")) {
      this.props.history.push("/");
    }
    await apis
      .getUserById(localStorage.getItem("id"))
      .then((res) => {
        this.setState({
          data: res.data.data.Tasks.map((d) => {
            return {
              TaskId: d.TaskId,
              Start: new Date(d.Start),
              End: new Date(d.End),
              Title: d.Title,
              Scheduled: d.Scheduled,
              Description: d.Description
            };
          }), scheduled: res.data.data.ScheduledTasks
        });
      })
      .catch((err) => {});
  }

  handleShowAddTask = (status) => {
    this.setState({ showAddTask: status });
  };
  handleShowSuggestions = (status) => {
    this.setState({ showSuggestions: status });
  };

  handleShowApproaching = (status) => {
    this.setState({ showApproachings: status });
  };

  async update() {
    console.log(this.state.Updated, "updateeeeeddd");
    console.log(typeof this.state.Updated)
    await apis
      .updateNewTasks(localStorage.getItem("id"), {
        Tasks: this.state.data,
        Updated: this.state.Updated
      })
      .then((res) => {
        console.log("updated Tasks");
      })
      .catch((err) => {
        console.log("cannot update tasks");
      });
  }

  handleDataChange = ({ created, updated, deleted }) => {
    console.log(this.state.data);
    this.setState(
      {
        data: this.state.data // Filter the deleted items
          .filter(
            (item) =>
              deleted.find((current) => current.TaskId === item.TaskId) ===
              undefined
          ) // Find and replace the updated items
          .map(
            (item) =>
              updated.find((current) => current.TaskId === item.TaskId) || item
          ) // Add the newly created items and assign an `id`.
          .concat(
            created.map((item) =>
              Object.assign({}, item, {
                TaskId: guid(),
              })
            )
          ), Updated: updated
      },
      () => this.update()
    );
  };

//  makeFalse(){
//    for(let i = 0;i<this.state.scheduled.length;i++){
//      if(this.state.Updated.length!=0){
//        if(this.state.Updated[0].TaskId === this.state.scheduled[i]){
//          for(let j = 0;j<)
//        }
//      }
//    }
//  }

  render() {
    return (
      <div style={{ height: "100vh", overflowY: "auto" }}>
        <PageHeader />
        <Scheduler
          onDataChange={this.handleDataChange}
          data={this.state.data}
          defaultDate={displayDate}
          modelFields={modelFields}
          editable={{
            remove: true,
            resize: true,
            add: true,
            edit: true,
            select: true,
            drag: true,
          }}
        >
          <TimelineView />
          <DayView />
          <WeekView />
          <MonthView />
          <AgendaView />
        </Scheduler>
        <div style={{ marginLeft: "30em", marginTop: "1em" }}>
          <p>Want to schedule for you your tasks? Just Enter them below:</p>
          <button
            className="ButtonBasicColor"
            onClick={() => this.handleShowAddTask(true)}
            style={{ marginLeft: "10em", marginTop: "0.25em" }}
          >
            Add My Task
          </button>
        </div>
        <div style={{ marginLeft: "29.5em", marginTop: "2em" }}>
          <p style={{ marginLeft: "7.5em" }}>View the overlapping events:</p>
          <button
            className="ButtonBasicColor"
            onClick={() => this.handleShowSuggestions(true)}
            style={{ marginLeft: "8em", marginTop: "0.25em" }}
          >
            View Overlapping Events
          </button>
          <Button
            style={{ float: "right", marginBottom: "8em" }}
            variant="danger"
            onClick={() => this.handleShowApproaching(true)}
          >
            View Approaching Deadlines!
          </Button>
          <OverlappingEvents
            showSuggestions={this.state.showSuggestions}
            onPopupClose={this.handleShowSuggestions}
          ></OverlappingEvents>
          <AddTaskPopUp
            showAddTask={this.state.showAddTask}
            onPopupClose={this.handleShowAddTask}
          ></AddTaskPopUp>
          <Approaching
            showApproachings={this.state.showApproachings}
            onPopupClose={this.handleShowApproaching}
          ></Approaching>
        </div>
      </div>
    );
  }
}

export default withRouter(Schedulerr);
