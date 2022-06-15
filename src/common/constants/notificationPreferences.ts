type FormOption<L = NotificationPreferencesLabels ,V = NotificationPreferencesValues> = {
  label: L;
  value: V;
}

export enum NotificationPreferencesLabels {
  EMAIL = "Email",
 // WHATSAPP = 'WhatsApp',
  SMS = 'SMS',
}

export enum NotificationPreferencesValues {
  EMAIL = "email",
 // WHATSAPP = 'whatsApp',
  SMS = 'sms',
}

export const NotificationPreferencesRecord: Record<NotificationPreferencesValues, FormOption> = {
  [NotificationPreferencesValues.EMAIL]: {
    label: NotificationPreferencesLabels.EMAIL,
    value: NotificationPreferencesValues.EMAIL,
  },
  /* [NotificationPreferencesValues.WHATSAPP]: {
    label: NotificationPreferencesLabels.WHATSAPP,
    value: NotificationPreferencesValues.WHATSAPP,
  }, */
  [NotificationPreferencesValues.SMS]: {
    label: NotificationPreferencesLabels.SMS,
    value: NotificationPreferencesValues.SMS,
  },
};

export const NotificationPreferences: Array<FormOption> = Object.values(NotificationPreferencesRecord)
  .map((notificationType) => ({
    label: notificationType.label,
    value: notificationType.value,
  }))
