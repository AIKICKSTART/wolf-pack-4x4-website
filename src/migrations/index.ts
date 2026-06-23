import * as migration_20260526_131103_initial_control_os_schema from './20260526_131103_initial_control_os_schema';
import * as migration_20260526_150111_marketing_approval_audit_controls from './20260526_150111_marketing_approval_audit_controls';
import * as migration_20260527_012000_marketing_approval_origin_metadata from './20260527_012000_marketing_approval_origin_metadata';
import * as migration_20260528_232130_add_cms_blocks from './20260528_232130_add_cms_blocks';
import * as migration_20260610_064239_cms_webbuilder from './20260610_064239_cms_webbuilder';
import * as migration_20260610_142428_section_content from './20260610_142428_section_content';

export const migrations = [
  {
    up: migration_20260526_131103_initial_control_os_schema.up,
    down: migration_20260526_131103_initial_control_os_schema.down,
    name: '20260526_131103_initial_control_os_schema',
  },
  {
    up: migration_20260526_150111_marketing_approval_audit_controls.up,
    down: migration_20260526_150111_marketing_approval_audit_controls.down,
    name: '20260526_150111_marketing_approval_audit_controls',
  },
  {
    up: migration_20260527_012000_marketing_approval_origin_metadata.up,
    down: migration_20260527_012000_marketing_approval_origin_metadata.down,
    name: '20260527_012000_marketing_approval_origin_metadata',
  },
  {
    up: migration_20260528_232130_add_cms_blocks.up,
    down: migration_20260528_232130_add_cms_blocks.down,
    name: '20260528_232130_add_cms_blocks',
  },
  {
    up: migration_20260610_064239_cms_webbuilder.up,
    down: migration_20260610_064239_cms_webbuilder.down,
    name: '20260610_064239_cms_webbuilder',
  },
  {
    up: migration_20260610_142428_section_content.up,
    down: migration_20260610_142428_section_content.down,
    name: '20260610_142428_section_content'
  },
];
