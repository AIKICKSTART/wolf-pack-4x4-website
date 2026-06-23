"use client"

import { Send } from "lucide-react"
import { useState, type ChangeEvent, type FormEvent } from "react"

import styles from "./send-for-signature-card.module.css"

export interface SignatureRequest {
  signerName: string
  signerEmail: string
  subject: string
  coverNote: string
}

interface SendForSignatureCardProps {
  defaults: SignatureRequest
  onSend?: (request: SignatureRequest) => void
}

export function SendForSignatureCard({ defaults, onSend }: SendForSignatureCardProps) {
  const [request, setRequest] = useState<SignatureRequest>(defaults)

  const update = (key: keyof SignatureRequest) => (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRequest((prev) => ({ ...prev, [key]: event.target.value }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSend?.(request)
  }

  return (
    <section className={styles.card} aria-labelledby="send-signature-title">
      <header className={styles.head}>
        <span className={styles.kicker}>Send for signature</span>
        <h3 id="send-signature-title" className={styles.title}>Email this quote</h3>
        <p className={styles.body}>
          Once sent, the recipient gets a secure link to view, sign, or counter the quote.
        </p>
      </header>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label className={styles.field}>
            <span className={styles.fieldLabel}>Signer name</span>
            <input
              type="text"
              className={styles.input}
              value={request.signerName}
              autoComplete="name"
              required
              onChange={update("signerName")}
            />
          </label>
          <label className={styles.field}>
            <span className={styles.fieldLabel}>Signer email</span>
            <input
              type="email"
              className={styles.input}
              value={request.signerEmail}
              autoComplete="email"
              required
              onChange={update("signerEmail")}
            />
          </label>
        </div>
        <label className={styles.field}>
          <span className={styles.fieldLabel}>Email subject</span>
          <input
            type="text"
            className={styles.input}
            value={request.subject}
            required
            onChange={update("subject")}
          />
        </label>
        <label className={styles.field}>
          <span className={styles.fieldLabel}>Cover note</span>
          <textarea
            className={styles.textarea}
            value={request.coverNote}
            rows={4}
            onChange={update("coverNote")}
          />
        </label>
        <button type="submit" className={styles.send}>
          <Send size={16} aria-hidden="true" />
          Send quote for signature
        </button>
      </form>
    </section>
  )
}

export default SendForSignatureCard
