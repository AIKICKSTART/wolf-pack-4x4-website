/* Shared types for the compliance + governance + privacy primitive system. */

export type ComplianceFramework =
  | "iso-27001"
  | "soc-2"
  | "gdpr"
  | "pci-dss"
  | "hipaa"
  | "privacy-act-1988"
  | "essential-8"
  | "irap"
  | "austrac-amlctf"

export type ComplianceStatus =
  | "compliant"
  | "in-progress"
  | "lapsed"
  | "not-started"

export type DsrRequestType =
  | "access"
  | "erasure"
  | "rectification"
  | "portability"
  | "restriction"

export type EncryptionAlgo =
  | "aes-256-gcm"
  | "aes-256-cbc"
  | "chacha20-poly1305"
  | "tls-1-3"
  | "tls-1-2"

export type KeyManagementBacking =
  | "aws-kms"
  | "gcp-kms"
  | "azure-keyvault"
  | "hsm"
  | "tpm"

export type IncidentSeverity = "sev-1" | "sev-2" | "sev-3" | "sev-4"

export type ComplianceTone =
  | "red"
  | "amber"
  | "teal"
  | "green"
  | "neutral"
  | "violet"

export type LegalBasis =
  | "consent"
  | "contract"
  | "legal-obligation"
  | "vital-interest"
  | "public-task"
  | "legitimate-interest"

export const FRAMEWORK_LABEL: Record<ComplianceFramework, string> = {
  "iso-27001": "ISO/IEC 27001",
  "soc-2": "SOC 2 Type II",
  gdpr: "GDPR",
  "pci-dss": "PCI DSS v4",
  hipaa: "HIPAA",
  "privacy-act-1988": "Privacy Act 1988 (Cth)",
  "essential-8": "ASD Essential 8",
  irap: "IRAP (PROTECTED)",
  "austrac-amlctf": "AUSTRAC AML/CTF",
}

export const FRAMEWORK_SHORT: Record<ComplianceFramework, string> = {
  "iso-27001": "ISO 27001",
  "soc-2": "SOC 2",
  gdpr: "GDPR",
  "pci-dss": "PCI",
  hipaa: "HIPAA",
  "privacy-act-1988": "APP",
  "essential-8": "E8",
  irap: "IRAP",
  "austrac-amlctf": "AML/CTF",
}

export const STATUS_LABEL: Record<ComplianceStatus, string> = {
  compliant: "Compliant",
  "in-progress": "In Progress",
  lapsed: "Lapsed",
  "not-started": "Not Started",
}

export const STATUS_TONE: Record<ComplianceStatus, ComplianceTone> = {
  compliant: "green",
  "in-progress": "amber",
  lapsed: "red",
  "not-started": "neutral",
}

export const DSR_LABEL: Record<DsrRequestType, string> = {
  access: "Right of access",
  erasure: "Right to erasure",
  rectification: "Rectification",
  portability: "Data portability",
  restriction: "Restriction of processing",
}

export const DSR_DESCRIPTION: Record<DsrRequestType, string> = {
  access: "Receive a copy of personal information we hold about you.",
  erasure: "Request deletion subject to retention obligations.",
  rectification: "Correct inaccurate or out-of-date personal information.",
  portability: "Receive your data in a structured, machine-readable form.",
  restriction: "Temporarily restrict processing while a dispute is resolved.",
}

export const ENCRYPTION_LABEL: Record<EncryptionAlgo, string> = {
  "aes-256-gcm": "AES-256-GCM",
  "aes-256-cbc": "AES-256-CBC",
  "chacha20-poly1305": "ChaCha20-Poly1305",
  "tls-1-3": "TLS 1.3",
  "tls-1-2": "TLS 1.2",
}

export const KEY_MGMT_LABEL: Record<KeyManagementBacking, string> = {
  "aws-kms": "AWS KMS",
  "gcp-kms": "GCP KMS",
  "azure-keyvault": "Azure Key Vault",
  hsm: "HSM (FIPS 140-3)",
  tpm: "TPM 2.0",
}

export const SEVERITY_LABEL: Record<IncidentSeverity, string> = {
  "sev-1": "SEV-1 — Critical",
  "sev-2": "SEV-2 — High",
  "sev-3": "SEV-3 — Medium",
  "sev-4": "SEV-4 — Low",
}

export const SEVERITY_TONE: Record<IncidentSeverity, ComplianceTone> = {
  "sev-1": "red",
  "sev-2": "amber",
  "sev-3": "teal",
  "sev-4": "neutral",
}

export const LEGAL_BASIS_LABEL: Record<LegalBasis, string> = {
  consent: "Consent",
  contract: "Contract performance",
  "legal-obligation": "Legal obligation",
  "vital-interest": "Vital interests",
  "public-task": "Public task",
  "legitimate-interest": "Legitimate interest",
}
