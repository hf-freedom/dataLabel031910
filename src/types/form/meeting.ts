export interface MeetingFormData {
  id?: string
  title: string
  time: string
  location: string
  attendees: string[]
  equipment: string[]
  description: string
}

export interface MeetingQueryForm {
  title: string
  status: string
  dateRange: string[]
}

export interface MeetingMinutesForm {
  content: string
  todos: string
}
