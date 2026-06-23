import { Avatar } from "../primitives/avatar"
import { Chip } from "../primitives/chip"
import {
  TECH_LOCATION_LABEL,
  type TechLocation,
} from "./workshop-floor-types"
import styles from "./technician-location-pin.module.css"

export interface TechnicianLocationPinProps {
  name: string
  /** Role e.g. "Apprentice Y3" or "Lead fitter". */
  role: string
  location: TechLocation
  avatarSrc?: string
  /** Activity verb, e.g. "Welding Y-pipe" / "On lunch". */
  doing?: string
  /** "Online" / "On break" — drives the avatar dot. */
  online?: boolean
  className?: string
}

export function TechnicianLocationPin({
  name,
  role,
  location,
  avatarSrc,
  doing,
  online = true,
  className,
}: TechnicianLocationPinProps) {
  const classes = [styles.pin, className].filter(Boolean).join(" ")
  const tone = location === "off-floor" ? "neutral" : "amber"

  return (
    <article
      className={classes}
      aria-label={`${name}, currently at ${TECH_LOCATION_LABEL[location]}`}
    >
      <Avatar
        name={name}
        src={avatarSrc}
        size="md"
        tone="red"
        status={online ? "online" : "away"}
      />
      <div className={styles.body}>
        <strong className={styles.name}>{name}</strong>
        <span className={styles.role}>{role}</span>
        <div className={styles.row}>
          <Chip label={TECH_LOCATION_LABEL[location]} tone={tone} />
          {doing && <span className={styles.doing}>{doing}</span>}
        </div>
      </div>
    </article>
  )
}

export default TechnicianLocationPin
