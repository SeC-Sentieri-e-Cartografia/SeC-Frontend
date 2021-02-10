import { TrailPreview } from './TrailPreview';
import { Status } from './Status';
import { AccessibilityNotificationUnresolved } from './AccessibilityNotificationUnresolved';

export interface AccessibilityNotificationUnresolvedResponse { 
    content : AccessibilityNotificationUnresolved[],
    status: Status,
    messages: string[]
}