import { PrintSheet } from "./print-sheet"

import styles from "./print-work-order.module.css"

export interface WorkOrderCustomer {
  name: string
  phone: string
  email: string
  address: string
}

export interface WorkOrderVehicle {
  rego: string
  make: string
  model: string
  year: number
  vin: string
  odometer: string
}

export interface WorkOrderRequestedTask {
  id: string
  description: string
  estimatedHours: number
}

export interface WorkOrderPartUsed {
  sku: string
  description: string
  quantity: number
}

export interface WorkOrderHoursLog {
  bay: string
  technician: string
  startedAt: string
  endedAt: string
}

interface PrintWorkOrderProps {
  workOrderNumber: string
  openedAt: string
  openedIso: string
  customer: WorkOrderCustomer
  vehicle: WorkOrderVehicle
  requestedTasks: ReadonlyArray<WorkOrderRequestedTask>
  technicians: ReadonlyArray<string>
  partsUsed: ReadonlyArray<WorkOrderPartUsed>
  hoursLog: ReadonlyArray<WorkOrderHoursLog>
  hoursBudget: number
  scope: string
}

export function PrintWorkOrder({
  workOrderNumber,
  openedAt,
  openedIso,
  customer,
  vehicle,
  requestedTasks,
  technicians,
  partsUsed,
  hoursLog,
  hoursBudget,
  scope,
}: PrintWorkOrderProps) {
  return (
    <PrintSheet
      format="A4"
      ariaLabel={`Work order ${workOrderNumber}`}
      header={
        <div className={styles.head}>
          <div>
            <span className={styles.kicker}>Workshop · Oak Flats NSW</span>
            <h1>Work order</h1>
          </div>
          <dl className={styles.docMeta}>
            <div>
              <dt>W/O no.</dt>
              <dd>{workOrderNumber}</dd>
            </div>
            <div>
              <dt>Opened</dt>
              <dd>
                <time dateTime={openedIso}>{openedAt}</time>
              </dd>
            </div>
            <div>
              <dt>Budget</dt>
              <dd>{hoursBudget.toFixed(1)} hr</dd>
            </div>
          </dl>
        </div>
      }
      footer={
        <>
          <span>This work order is a binding statement of authorised work between customer and Oak Flats Mufflermen.</span>
          <span>Retain copy for warranty and ADR compliance.</span>
        </>
      }
    >
      <section className={styles.blocks} aria-label="Customer and vehicle">
        <article className={styles.block}>
          <span className={styles.blockKicker}>Customer</span>
          <strong>{customer.name}</strong>
          <dl>
            <div>
              <dt>Phone</dt>
              <dd>{customer.phone}</dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>{customer.email}</dd>
            </div>
            <div>
              <dt>Address</dt>
              <dd>{customer.address}</dd>
            </div>
          </dl>
        </article>
        <article className={styles.block}>
          <span className={styles.blockKicker}>Vehicle</span>
          <strong>
            {vehicle.year} {vehicle.make} {vehicle.model}
          </strong>
          <dl>
            <div>
              <dt>Rego</dt>
              <dd>{vehicle.rego}</dd>
            </div>
            <div>
              <dt>VIN</dt>
              <dd>{vehicle.vin}</dd>
            </div>
            <div>
              <dt>Odometer</dt>
              <dd>{vehicle.odometer}</dd>
            </div>
          </dl>
        </article>
      </section>

      <section className={styles.scope} aria-label="Scope of work">
        <span className={styles.sectionKicker}>Scope</span>
        <p>{scope}</p>
      </section>

      <section className={styles.printSection} aria-label="Requested tasks">
        <span className={styles.sectionKicker}>Requested tasks</span>
        <table className={styles.tasksTable}>
          <thead>
            <tr>
              <th scope="col" className={styles.colId}>ID</th>
              <th scope="col">Task</th>
              <th scope="col" className={styles.colHours}>Est. hr</th>
              <th scope="col" className={styles.colCheck}>Done</th>
            </tr>
          </thead>
          <tbody>
            {requestedTasks.map((task) => (
              <tr key={task.id}>
                <td className={styles.colId}>{task.id}</td>
                <td>{task.description}</td>
                <td className={styles.colHours}>{task.estimatedHours.toFixed(1)}</td>
                <td className={styles.colCheck}>
                  <span className={styles.checkBox} aria-hidden="true" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className={styles.printSection} aria-label="Technician assignments">
        <span className={styles.sectionKicker}>Assigned technicians</span>
        <div className={styles.techGrid}>
          {technicians.map((tech) => (
            <span key={tech} className={styles.techBadge}>
              {tech}
            </span>
          ))}
        </div>
      </section>

      <section className={styles.printSection} aria-label="Hours log">
        <span className={styles.sectionKicker}>Hours log</span>
        <table className={styles.tasksTable}>
          <thead>
            <tr>
              <th scope="col">Bay</th>
              <th scope="col">Technician</th>
              <th scope="col">Started</th>
              <th scope="col">Ended</th>
            </tr>
          </thead>
          <tbody>
            {hoursLog.map((entry) => (
              <tr key={`${entry.bay}-${entry.startedAt}`}>
                <td>{entry.bay}</td>
                <td>{entry.technician}</td>
                <td>{entry.startedAt}</td>
                <td>{entry.endedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className={styles.printSection} aria-label="Parts used">
        <span className={styles.sectionKicker}>Parts used</span>
        <table className={styles.tasksTable}>
          <thead>
            <tr>
              <th scope="col" className={styles.colId}>SKU</th>
              <th scope="col">Description</th>
              <th scope="col" className={styles.colHours}>Qty</th>
            </tr>
          </thead>
          <tbody>
            {partsUsed.map((part) => (
              <tr key={part.sku}>
                <td className={styles.colId}>{part.sku}</td>
                <td>{part.description}</td>
                <td className={styles.colHours}>{part.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className={styles.signoff} aria-label="Sign-off">
        <div>
          <span className={styles.sectionKicker}>Customer sign-off</span>
          <div className={styles.signLine} aria-hidden="true" />
          <small>Signature · Date</small>
        </div>
        <div>
          <span className={styles.sectionKicker}>Technician sign-off</span>
          <div className={styles.signLine} aria-hidden="true" />
          <small>Signature · Date</small>
        </div>
      </section>
    </PrintSheet>
  )
}

export default PrintWorkOrder
