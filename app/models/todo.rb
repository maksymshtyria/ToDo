class Todo < ActiveRecord::Base
  attr_accessible :project, :title, :done
end
