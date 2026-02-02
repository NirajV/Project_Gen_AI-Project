import React from 'react';
import { TableCell, TableRow, TableBody, Table } from '@material-ui/core';
import times from './utils/times';

class TimeSlots extends React.Component {

  render() {
    //Get timeslot of 30min duration
    const slots = times.getTimeSlots(30);

    return (
      <TableRow>
        <TableCell colSpan="8">
          <Table>
            <TableBody>
              {
                slots.map((slot, index) => {
                  return (
                    <TableRow>
                      <TableCell>
                        {slot}
                      </TableCell>
                    </TableRow>
                  )
                })
              }
            </TableBody>
          </Table>
        </TableCell>
      </TableRow>
    )
  }
}

export default TimeSlots