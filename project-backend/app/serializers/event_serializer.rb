class EventSerializer < ActiveModel::Serializer
  attributes :id, :description, :name, :time, :date
  belongs_to :city
  
end
